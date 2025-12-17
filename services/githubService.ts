import { Project } from '../types';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner: {
    login: string;
  };
  default_branch: string;
}

interface GithubContent {
  name: string;
  path: string;
  type: string;
}

// Helper to assign images based on language/topic
const getProjectImage = (language: string | null, topics: string[] = []): string => {
  const lang = language?.toLowerCase() || '';
  const topicString = topics.join(' ').toLowerCase();

  if (lang.includes('python') || topicString.includes('data')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'; // Data Viz
  }
  if (lang.includes('jupyter') || topicString.includes('analysis')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'; // Charts
  }
  if (lang.includes('javascript') || lang.includes('typescript') || lang.includes('html')) {
    return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'; // Coding
  }
  if (topicString.includes('learning') || topicString.includes('ai')) {
    return 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800'; // AI/Brain
  }
  
  // Default Abstract Tech
  return 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800';
};

export const fetchGithubProjects = async (username: string): Promise<Project[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch github repos');
    }

    const repos: GithubRepo[] = await response.json();

    // Filter out forks (optional) and select top 6
    const portfolioRepos = repos
      .filter(repo => !repo.forks_count && repo.description) 
      .sort((a, b) => b.stargazers_count - a.stargazers_count) 
      .slice(0, 6);

    return portfolioRepos.map(repo => ({
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').toUpperCase(),
      description: repo.description,
      tags: repo.topics.length > 0 ? repo.topics : [repo.language || 'Code'],
      imageUrl: getProjectImage(repo.language, repo.topics),
      link: repo.html_url,
      details: `Project ${repo.name} developed using ${repo.language}. Has ${repo.stargazers_count} stars on GitHub.`,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      owner: repo.owner.login,
      repoName: repo.name,
      defaultBranch: repo.default_branch,
      language: repo.language
    }));

  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
};

// New function to find the primary notebook file in a repo
export const findNotebookInRepo = async (owner: string, repo: string): Promise<string | null> => {
  try {
    // Fetch root contents
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
    if (!response.ok) return null;

    const contents: GithubContent[] = await response.json();
    
    // Find the first .ipynb file
    const notebook = contents.find(file => file.name.endsWith('.ipynb') && file.type === 'file');
    
    return notebook ? notebook.path : null;
  } catch (error) {
    console.error("Error finding notebook:", error);
    return null;
  }
};