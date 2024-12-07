import React from 'react';

interface File {
  name: string;
  link: string;
}

interface News {
  _id: string;
  title: string;
  description: string;
  files: File[];
  createdAt: string;
}

async function fetchNews(): Promise<News[]> {
  // const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`http://localhost:3000/api/newslist`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await res.json();
  return data.data;
}

export default async function NewsList() {
  const newsList = await fetchNews();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-6 bg-blue-400 p-2 mx-auto flex justify-center">ข่าวประชาสัมพันธ์</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map((news) => (
          <div
            key={news._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="font-semibold mb-2">{news.title}</h2>
            {/* <p className="text-gray-600 mb-4">{news.description}</p> */}
            <div>
              {/* <h3 className="font-medium text-gray-800">ไฟล์แนบ:</h3> */}
              <ul className="list-disc list-inside">
                {news.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}