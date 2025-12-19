import type { PostManifestEntry } from '../models/PostManifestEntry';

const base = import.meta.env.BASE_URL || '/';

export const staticPostTypesService = {
  fetchPostTypes: async () => {
    const response = await fetch(`${base}data/posts-manifest.json`);

    if (!response.ok) {
      throw new Error('Failed to fetch static post types');
    }

    const manifest: PostManifestEntry[] = await response.json();
    const postTypes = [...new Set(manifest.map((entry) => entry.type))];

    return postTypes;
  }
};
