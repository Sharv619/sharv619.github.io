export interface LinkedInPost {
  /** Numeric id from the post URL, e.g. .../activity-7182736451234567890-ab12 -> "7182736451234567890" */
  activityId: string;
  /** Short accessible title, shown as the iframe title attribute. */
  title: string;
}

// Add entries here to populate the "From LinkedIn" scroll row on the homepage.
// Grab the activityId from the post's URL bar — no LinkedIn embed-menu step needed.
export const linkedinPosts: LinkedInPost[] = [];
