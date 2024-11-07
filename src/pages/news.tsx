'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import HeaderSection from '@/components/sections/header-section';
import FooterSection from '@/components/sections/footer-section';
import { useTheme } from '@/context/theme-context/ThemeContext';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
}

const NewsPage: React.FC = () => {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );

  useEffect(() => {
    // Simulating fetching news articles from an API
    const fetchArticles = async () => {
      // Replace this with actual API call when available
      const mockArticles: NewsArticle[] = [
        {
          id: 1,
          title: 'Ndi Igbo Sunderland Hosts Annual Cultural Festival',
          summary: 'A celebration of Igbo culture and heritage in Sunderland',
          content:
            'The annual cultural festival organized by Ndi Igbo Sunderland was a resounding success, showcasing the rich traditions and customs of the Igbo people...',
          date: '2023-07-15',
        },
        {
          id: 2,
          title: 'Community Outreach Program Launched',
          summary: 'New initiative aims to support local families',
          content:
            'Ndi Igbo Sunderland has launched a new community outreach program designed to provide support and resources to local families in need...',
          date: '2023-06-22',
        },
        // Add more mock articles as needed
      ];
      setArticles(mockArticles);
    };

    fetchArticles();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <HeaderSection />
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">
          News and Updates
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="mb-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{article.summary}</p>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <Button
                  onClick={() => setSelectedArticle(article)}
                  className={`${
                    theme === 'dark' ? 'bg-red-700' : 'bg-red-800'
                  } text-white`}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {selectedArticle.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{selectedArticle.content}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {selectedArticle.date}
                </p>
                <Button
                  onClick={() => setSelectedArticle(null)}
                  className={`${
                    theme === 'dark' ? 'bg-red-700' : 'bg-red-800'
                  } text-white`}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
