import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogAuthor {
  id: number;
  name: string;
  slug: string;
  avatar_url?: string | null;
  designation?: string | null;
  bio?: string | null;
  social_links?: any;
  created_at?: string;
}

export function useBlogAuthors() {
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      setAuthors(data ?? []);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const addAuthor = async (author: Omit<BlogAuthor, 'id' | 'created_at'>): Promise<BlogAuthor> => {
    const { data, error: err } = await supabase
      .from('blog_authors')
      .insert([author])
      .select('*')
      .single();
    if (err) throw new Error(err.message);
    await fetchAuthors();
    return data;
  };

  const updateAuthor = async (id: number, updates: Partial<Omit<BlogAuthor, 'id' | 'created_at'>>): Promise<BlogAuthor> => {
    const { data, error: err } = await supabase
      .from('blog_authors')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();
    if (err) throw new Error(err.message);
    await fetchAuthors();
    return data;
  };

  const deleteAuthor = async (id: number) => {
    const { error: err } = await supabase
      .from('blog_authors')
      .delete()
      .eq('id', id);
    if (err) throw new Error(err.message);
    await fetchAuthors();
  };

  return {
    authors,
    loading,
    error,
    refetch: fetchAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor,
  };
}
