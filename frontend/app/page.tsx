'use client'
import { useState, useEffect } from 'react';
import { useDebounce } from './hooks/useDebounce';

type TPhraseStatus = "active" | "pending" | "spam" | "deleted" | ""

type TPhrase = {
  id: string;
  phrase: string;
  status: TPhraseStatus;
  created_at: string;
  updated_at: string;
}

type TFilterOptions = {
  search: string;
  status: TPhraseStatus;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}


const PhrasesPage = () => {

  const [filterOptions, setFilterOptions] = useState<TFilterOptions>({
    search: "",
    status: "",
    sortBy: 'created_at',
    sortOrder: 'asc',
  });

  const [phrases, setPhrases] = useState<TPhrase[]>([]);

  // Debounce search
  const debouncedSearch = useDebounce(filterOptions.search, 500);

  // Fetch phrases from API based on current filter options
  const fetchPhrases = async () => {
    const { sortBy, sortOrder, status } = filterOptions;
    try {
      // Not using axios due to just one network call
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phrases/search?sortBy=${sortBy}&sort=${sortOrder}&query=${debouncedSearch}&status=${status}`
      )
      const phrases = await res.json();
      setPhrases(phrases);
    } catch (error) {
      console.error("Failed to fetch phrases ", error)
      setPhrases([]);
    }
  };

  // Handle filter and sort changes
  const updateFilterOptions = (newOptions: Partial<TFilterOptions>) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  // Handle sorting
  const handleSort = (field: string) => {
    const newOrder = filterOptions.sortOrder === 'asc' ? 'desc' : 'asc';
    updateFilterOptions({ sortBy: field, sortOrder: newOrder });
  };

  // Update phrases when filter or sort options change
  useEffect(() => {
    fetchPhrases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterOptions.sortBy, filterOptions.sortOrder, filterOptions.status]);

  // Render sort arrow to display on table header
  const renderSortArrow = (sortBy: string) => {
    const arrow = filterOptions.sortOrder === 'asc' ? "↑" : "↓"
    return filterOptions.sortBy === sortBy ? arrow : ""
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Phrases Table</h1>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <input
          type="text"
          placeholder="Search by phrase..."
          value={filterOptions.search}
          onChange={(e) => updateFilterOptions({ search: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mb-4 md:mb-0 md:mr-4 w-full md:w-1/3"
        />
        <select
          value={filterOptions.status}
          onChange={(e) => updateFilterOptions({ status: e.target.value as TPhraseStatus })}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/3 hover:cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="spam">Spam</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="py-3 px-6 text-left font-medium text-gray-600 hover:cursor-pointer"
                onClick={() => handleSort('phrase')}
              >
                Phrase {`${renderSortArrow("phrase")}`}
              </th>
              <th
                className="py-3 px-6 text-left font-medium text-gray-600 hover:cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status  {`${renderSortArrow("status")}`}
              </th>
              <th
                className="py-3 px-6 text-left font-medium text-gray-600 hover:cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                Created At  {`${renderSortArrow("created_at")}`}
              </th>
              <th
                className="py-3 px-6 text-left font-medium text-gray-600 hover:cursor-pointer"
                onClick={() => handleSort('updated_at')}
              >
                Updated At  {`${renderSortArrow("updated_at")}`}
              </th>
            </tr>
          </thead>
          <tbody>
            {phrases.map((phrase) => (
              <tr key={phrase.id + phrase.created_at} className="border-t hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-700">{phrase.phrase}</td>
                <td className="py-3 px-6 text-gray-700">{phrase.status}</td>
                <td className="py-3 px-6 text-gray-700">
                  {new Date(phrase.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-gray-700">
                  {new Date(phrase.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhrasesPage;
