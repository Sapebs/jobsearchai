import React from 'react';
import { Filter, ArrowUpDown, RefreshCw, Search } from 'lucide-react';

export const ControlsBar = ({
  activeFilter,
  setActiveFilter,
  searchFilter,
  setSearchFilter,
  sortBy,
  setSortBy,
  onRefresh,
  isRefreshing,
  totalResults
}) => {
  const filters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'high', label: 'High Match (≥ 75%)' },
    { id: 'med', label: 'Moderate Fit (50-74%)' },
    { id: 'low', label: 'Low Fit (< 50%)' }
  ];

  return (
    <div className="controls-bar glass-panel" id="controls-bar">
      <div className="controls-left">
        <Filter size={16} style={{ color: 'var(--text-dim)', marginRight: '0.2rem' }} />
        {filters.map((f) => (
          <button
            key={f.id}
            id={`filter-btn-${f.id}`}
            className={`filter-chip ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="controls-right">
        {/* Quick Filter Search */}
        <div className="input-with-icon" style={{ minWidth: '220px' }}>
          <Search size={15} className="input-icon" style={{ left: '0.75rem' }} />
          <input
            id="input-filter-jobs"
            type="text"
            className="input-field"
            style={{ padding: '0.45rem 0.8rem 0.45rem 2.2rem', fontSize: '0.85rem' }}
            placeholder="Filter title or company..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowUpDown size={15} style={{ color: 'var(--text-dim)' }} />
          <select
            id="select-sort-jobs"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="score_desc">Highest Match Score</option>
            <option value="score_asc">Lowest Match Score</option>
            <option value="newest">Newest First</option>
            <option value="company">Company (A-Z)</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          id="btn-refresh-jobs"
          className="btn-outline"
          style={{ padding: '0.45rem 0.75rem' }}
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Reload listings from Supabase"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          <span style={{ fontSize: '0.82rem' }}>Sync ({totalResults})</span>
        </button>
      </div>
    </div>
  );
};
