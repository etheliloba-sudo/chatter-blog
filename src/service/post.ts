import { supabase } from "../lib/supabase";
import type { Post, InsertPost, UpdatePost, Tag } from "../types/database";

export async function createPost(data: InsertPost): Promise<Post> {
  const { data: post, error } = await supabase
    .from("posts")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return post;
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles(*),
      tags:post_tags(
        tag:tags(*)
      )
    `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;

  return {
    ...data,
    tags: data.tags.map((t: { tag: Tag }) => t.tag),
  };
}

export async function getPostById(slug: string): Promise<Post> {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return post;
}

export async function getPublishedPosts(limit = 20) {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles(*),
      tags:post_tags(
        tag:tags(*)
      )
    `,
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data.map((post) => ({
    ...post,
    tags: post.tags.map((t: { tag: Tag }) => t.tag),
  }));
}


export async function getAllPosts(): Promise<Post[]> {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return posts;
}

export async function updatePost(id: string, data: UpdatePost): Promise<Post> {
  const { data: post, error } = await supabase
    .from("posts")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return post;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
}
