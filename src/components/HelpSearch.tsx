"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchHelpArticles, type HelpArticle } from "../lib/helpSearchData";
import Link from "next/link";

interface HelpSearchProps {
  locale: string;
  placeholder?: string;
  className?: string;
}

export default function HelpSearch({ locale, placeholder, className = "" }: HelpSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HelpArticle[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lyyli-help-recent-searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent searches:", e);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("lyyli-help-recent-searches", JSON.stringify(updated));
  };

  // Handle search input changes
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim()) {
      setIsSearching(true);
      const searchResults = searchHelpArticles(value, locale);
      setResults(searchResults);
      setShowResults(true);
      setIsSearching(false);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      setShowResults(false);
      // You could redirect to a search results page here
      // router.push(`/${locale}/help/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Handle result selection
  const handleResultSelect = (article: HelpArticle) => {
    saveRecentSearch(query);
    setShowResults(false);
    setQuery("");
    router.push(`/${locale}${article.url}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultSelect(results[selectedIndex]);
        } else if (query.trim()) {
          handleSearchSubmit(e);
        }
        break;
      case "Escape":
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle recent search click
  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    handleSearchChange(searchTerm);
    inputRef.current?.focus();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    if (locale === 'fi') {
      switch (difficulty) {
        case 'beginner': return 'Aloittelija';
        case 'intermediate': return 'Keskitaso';
        case 'advanced': return 'Edistynyt';
        default: return difficulty;
      }
    }
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() || recentSearches.length > 0) {
              setShowResults(true);
            }
          }}
          placeholder={placeholder || (locale === "fi" ? "Etsi apua..." : "Search for help...")}
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-forest text-white px-6 py-2 rounded-md hover:bg-forest/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-forest mx-auto mb-2"></div>
              {locale === "fi" ? "Etsitään..." : "Searching..."}
            </div>
          ) : query.trim() ? (
            // Search Results
            <div>
              {results.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                    {locale === "fi" 
                      ? `${results.length} hakutulosta` 
                      : `${results.length} search results`
                    }
                  </div>
                  {results.map((article, index) => (
                    <button
                      key={article.id}
                      onClick={() => handleResultSelect(article)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 transition-colors ${
                        index === selectedIndex ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {locale === "fi" ? article.titleFi : article.title}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                              {getDifficultyText(article.difficulty)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {locale === "fi" ? article.timeToCompleteFi : article.timeToComplete}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {locale === "fi" ? article.summaryFi : article.summary}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {locale === "fi" ? article.categoryFi : article.category}
                            </span>
                            <div className="flex gap-1">
                              {(locale === "fi" ? article.tagsFi : article.tags).slice(0, 3).map((tag, tagIndex) => (
                                <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-sm">
                    {locale === "fi" 
                      ? "Ei hakutuloksia. Kokeile eri hakusanoja."
                      : "No search results. Try different keywords."
                    }
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Recent Searches
            <div className="py-2">
              {recentSearches.length > 0 && (
                <>
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                    {locale === "fi" ? "Viimeisimmät haut" : "Recent searches"}
                  </div>
                  {recentSearches.map((searchTerm, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(searchTerm)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{searchTerm}</span>
                      </div>
                    </button>
                  ))}
                </>
              )}
              
              {/* Popular Topics */}
              <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                {locale === "fi" ? "Suosituimmat aiheet" : "Popular topics"}
              </div>
              <div className="py-2">
                {['getting-started', 'troubleshooting', 'integrations'].map((topic) => {
                  const article = searchHelpArticles(topic, locale)[0];
                  if (!article) return null;
                  
                  return (
                    <button
                      key={topic}
                      onClick={() => handleResultSelect(article)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-forest/10 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {locale === "fi" ? article.titleFi : article.title}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {locale === "fi" ? article.summaryFi : article.summary}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
