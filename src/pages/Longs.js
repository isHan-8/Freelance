// src/pages/Longs.js

import React, { useState, useEffect } from 'react';
import Layout from '../components/PrivateLayout';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import './Longs.css';

const Longs = () => {
  const [longFormContents, setLongFormContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLongFormContents();
  }, []);

  const fetchLongFormContents = () => {
    api.get('/api/long_form_contents/')
      .then(response => {
        setLongFormContents(response.data);
      })
      .catch(error => {
        console.error('Error fetching long-form contents:', error);
      });
  };

  const handleSearch = () => {
    api.post('/api/search_long_form/', { search_term: searchTerm })
      .then(response => {
        setLongFormContents(response.data);
      })
      .catch(error => {
        console.error('Error searching long-form contents:', error);
      });
  };

  return (
      <div className="container mt-5">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            id="longFormSearch"
            className="form-control"
            placeholder="Search Long-Form Content Titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>

        {/* Video Grid */}
        <div className="row" id="videoGrid">
          {longFormContents.length > 0 ? (
            longFormContents.map(content => (
              <div key={content.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card h-100 bg-dark text-white">
                  <img src={content.thumbnail_url} className="card-img-top" alt={content.title} />
                  <div className="card-body">
                    <h5 className="card-title">{content.title}</h5>
                    <p className="card-text">{content.description}</p>
                  </div>
                  <div className="card-footer">
                    <Link to={`/long_form/${content.id}`} className="btn btn-primary">Watch Now</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No results found.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default Longs;
