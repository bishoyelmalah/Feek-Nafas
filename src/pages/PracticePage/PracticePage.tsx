import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './PracticePage.module.css';
import { getAllProblems } from '../../services/codeforcesService';
import { type CodeforcesProblem } from '../../types/CodeforcesProblem';

const ITEMS_PER_PAGE = 30;

export function PracticePage() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<CodeforcesProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [ratingInput, setRatingInput] = useState('');

  // Fetch all problems on component mount
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      const data = await getAllProblems();
      if (data) {
        setProblems(data);
      }
      setLoading(false);
    };
    fetchProblems();
  }, []);

  // Get unique ratings and tags from problems
  const ratings = useMemo(() => {
    return Array.from(new Set(problems.map(p => p.rating).filter(Boolean)))
      .sort((a, b) => (a || 0) - (b || 0));
  }, [problems]);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    problems.forEach(p => {
      p.tags?.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  }, [problems]);

  // Filter problems based on selections and search
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(problem.rating || 0);
      const matchesTags = selectedTags.length === 0 || (problem.tags && problem.tags.some(tag => selectedTags.includes(tag)));
      const matchesSearch = problem.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRating && matchesTags && matchesSearch;
    });
  }, [problems, selectedRatings, selectedTags, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRatings, selectedTags, searchQuery]);

  const handleRatingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRatingInput(value);

    // Parse comma-separated ratings
    if (value.trim() === '') {
      setSelectedRatings([]);
    } else {
      const ratings = value
        .split(',')
        .map(r => parseInt(r.trim()))
        .filter(r => !isNaN(r));
      setSelectedRatings(ratings);
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const openProblem = (problem: CodeforcesProblem) => {
    window.open(
      `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
      '_blank'
    );
  };

  // Generate pagination pages
  const getPaginationPages = () => {
    const pages = [];
    const maxVisible = 5; // Show 5 page buttons + ellipsis
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  return (
    <>
      <Header activeLink="challenges" />
      
      <main className={styles.practiceContainer}>
        <div className={styles.header}>
          {/* <div className={styles.headerContent}>
            <h1 className={styles.title}>PRACTICE ARENA</h1>
            <p className={styles.subtitle}>Master algorithms with {problems.length} challenges from Codeforces</p>
          </div> */}
        </div>

        <div className={styles.content}>
          {/* Filters Sidebar */}
          <aside className={styles.filtersSidebar}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterTitle}>
                <span className="material-symbols-outlined">search</span>
                Search Problems
              </h3>
              <input
                type="text"
                placeholder="Problem name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>
                  <span className="material-symbols-outlined">grade</span>
                  Difficulty
                </h3>
                {selectedRatings.length > 0 && (
                  <button
                    className={styles.clearBtn}
                    onClick={() => {
                      setSelectedRatings([]);
                      setRatingInput('');
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="e.g., 800,1200,1500"
                value={ratingInput}
                onChange={handleRatingInputChange}
                className={styles.ratingInput}
              />
              <p className={styles.helpText}>Enter ratings separated by commas</p>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>
                  <span className="material-symbols-outlined">local_offer</span>
                  Topics
                </h3>
                {selectedTags.length > 0 && (
                  <button
                    className={styles.clearBtn}
                    onClick={() => setSelectedTags([])}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className={styles.dropdownContainer}>
                <button
                  className={styles.dropdownToggle}
                  onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                >
                  <span>{selectedTags.length > 0 ? `${selectedTags.length} selected` : 'Select topics'}</span>
                  <span className={`material-symbols-outlined ${isTagsDropdownOpen ? styles.open : ''}`}>
                    expand_more
                  </span>
                </button>
                {isTagsDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {tags.map(tag => (
                      <label key={tag} className={styles.dropdownItem}>
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                        />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {selectedTags.length > 0 && (
                <div className={styles.selectedTagsContainer}>
                  {selectedTags.map(tag => (
                    <div key={tag} className={styles.selectedTag}>
                      <span>{tag}</span>
                      <button
                        onClick={() => handleTagToggle(tag)}
                        title="Remove tag"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Problems Section */}
          <section className={styles.problemsSection}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>
                {filteredProblems.length} Problem{filteredProblems.length !== 1 ? 's' : ''} Found
              </h2>
              {(selectedRatings.length > 0 || selectedTags.length > 0 || searchQuery) && (
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setSelectedRatings([]);
                    setSelectedTags([]);
                    setSearchQuery('');
                    setRatingInput('');
                    setCurrentPage(1);
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>

            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading problems...</p>
              </div>
            ) : filteredProblems.length === 0 ? (
              <div className={styles.emptyState}>
                <span className="material-symbols-outlined">search_off</span>
                <h3>No Problems Found</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className={styles.problemsGrid}>
                  {paginatedProblems.map(problem => (
                    <div
                      key={`${problem.contestId}-${problem.index}`}
                      className={styles.problemCard}
                    >
                      <div className={styles.cardHeader}>
                        <h3 className={styles.problemName}>{problem.name}</h3>
                        <span className={`${styles.ratingTag} ${styles[`rating-${getDifficultyLevel(problem.rating || 0)}`]}`}>
                          {problem.rating || 'Unrated'}
                        </span>
                      </div>

                      <div className={styles.cardMeta}>
                        <span className={styles.contestId}>
                          <span className="material-symbols-outlined">tag</span>
                          Contest #{problem.contestId}
                        </span>
                        <span className={styles.problemIndex}>
                          Problem {problem.index}
                        </span>
                      </div>

                      {problem.tags && problem.tags.length > 0 && (
                        <div className={styles.tags}>
                          {problem.tags.slice(0, 3).map(tag => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                          {problem.tags.length > 3 && (
                            <span className={styles.tag}>+{problem.tags.length - 3}</span>
                          )}
                        </div>
                      )}

                      <button
                        className={styles.solveBtn}
                        onClick={() => openProblem(problem)}
                      >
                        <span className="material-symbols-outlined">arrow_outward</span>
                        Solve on Codeforces
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      className={styles.paginationBtn}
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    {getPaginationPages().map((page, idx) => (
                      typeof page === 'string' ? (
                        <span key={`ellipsis-${idx}`} className={styles.paginationEllipsis}>
                          {page}
                        </span>
                      ) : (
                        <button
                          key={page}
                          className={`${styles.paginationBtn} ${currentPage === page ? styles.active : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      )
                    ))}

                    <button
                      className={styles.paginationBtn}
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function getDifficultyLevel(rating: number): string {
  if (rating < 1000) return 'easy';
  if (rating < 1500) return 'medium';
  if (rating < 2000) return 'hard';
  if (rating < 2500) return 'extreme';
  return 'legendary';
}
