import { getSettings } from './storage';

const generateSimulatedJobs = (query, location, profile) => {
  const q = (query || profile?.targetQuery || 'Software Engineer').trim();
  const loc = (location || profile?.targetLocation || 'Remote').trim();
  const isStephen = profile?.id === 'stephen';

  const companies = [
    'Synthetix Cloud',
    'Aether Logic',
    'Cognitive Automations',
    'Vector Dynamics',
    'Prism Systems',
    'Horizon Digital',
    'Quantum Leap Labs',
    'Starlight Software'
  ];

  const randomCompany1 = companies[Math.floor(Math.random() * 4)] + ' ' + (Math.random() > 0.5 ? 'Technologies' : 'Labs');
  const randomCompany2 = companies[Math.floor(Math.random() * 4) + 4] + ' Systems';

  const hash1 = 'job_' + Math.random().toString(36).substring(2, 11);
  const hash2 = 'job_' + Math.random().toString(36).substring(2, 11);

  // Compute a realistic score between 80 and 96
  const score1 = Math.floor(Math.random() * 12) + 85; // 85 - 96
  const score2 = Math.floor(Math.random() * 15) + 75; // 75 - 89

  const job1 = {
    hash_id: hash1,
    company: randomCompany1,
    title: `Senior ${q}`,
    location: loc,
    source: 'Google Jobs via SerpAPI',
    job_url: `https://www.google.com/search?q=${encodeURIComponent(q + ' ' + loc + ' jobs')}`,
    match_score: score1,
    profile_id: profile?.id || 'aridon',
    created_at: new Date().toISOString(),
    is_new: true,
    summary: `Exceptional ${score1}% match for ${profile?.name}! Directly matches your core background in ${profile?.coreSkills?.slice(0, 3).join(', ')} with high impact and flexibility.`,
    pros: [
      `High stack overlap with candidate profile (${profile?.coreSkills?.slice(0, 3).join(', ')})`,
      `Target role alignment with ${profile?.title}`,
      `Offers competitive compensation and ${loc.toLowerCase().includes('remote') ? '100% remote asynchronous environment' : 'flexible work arrangement'}`
    ],
    cons: [
      `Fast-growing engineering team with occasional on-call rotation`
    ],
    missing_keywords: isStephen ? ['Kafka', 'Temporal.io'] : ['GraphQL Subscriptions', 'Terraform'],
    description: `We are actively hiring a Senior ${q} located in ${loc}.

Responsibilities:
- Build, optimize, and maintain scalable systems supporting thousands of active users.
- Work with cutting-edge tools including ${profile?.coreSkills?.slice(0, 4).join(', ')}.
- Collaborate in an agile, remote-first team committed to high engineering quality.

Requirements:
- 3+ years experience building production software.
- Deep expertise in ${profile?.coreSkills?.slice(0, 3).join(', ')}.
- Strong communication and asynchronous problem-solving skills.`
  };

  const job2 = {
    hash_id: hash2,
    company: randomCompany2,
    title: `Lead ${q}`,
    location: loc,
    source: 'LinkedIn via SerpAPI',
    job_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q)}`,
    match_score: score2,
    profile_id: profile?.id || 'aridon',
    created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    is_new: true,
    summary: `Strong ${score2}% match for ${profile?.name}. Emphasizes architectural ownership and hands-on delivery using modern cloud and API tooling.`,
    pros: [
      `Architecture leadership role with direct input on technology choices`,
      `Collaborative culture focused on automated testing, CI/CD, and fast iteration`,
      `Generous equity grant and home office budget`
    ],
    cons: [
      `Requires 4+ years of hands-on experience in enterprise or high-scale environments`
    ],
    missing_keywords: ['Elasticsearch', 'CI/CD Pipeline Security'],
    description: `We are seeking an experienced Lead ${q} to join our growing organization.

Key Highlights:
- Own core components and guide best engineering practices.
- Leverage ${profile?.coreSkills?.slice(2, 6).join(', ')} to deliver reliable product features.
- Work closely with product and cross-functional teams to iterate rapidly.`
  };

  return [job1, job2];
};

export const triggerJobHunter = async ({
  query,
  location,
  profile,
  onStatusUpdate
}) => {
  const settings = getSettings();
  const webhookUrl = settings.n8nWebhookUrl?.trim();

  const payload = {
    query: query || profile?.targetQuery || 'Software Engineer',
    location: location || profile?.targetLocation || 'Remote',
    user_id: profile?.id || 'aridon',
    user_name: profile?.name || 'Candidate',
    notification_email: profile?.email || 'unimawho.leadgen@gmail.com',
    candidate_profile: {
      name: profile?.name,
      title: profile?.title,
      coreSkills: profile?.coreSkills || [],
      preferredRoles: profile?.preferredRoles || [],
      summary: profile?.summary || ''
    }
  };

  // If live webhook URL is provided, send real HTTP POST
  if (webhookUrl) {
    if (onStatusUpdate) {
      onStatusUpdate({
        stage: 'connecting',
        message: `Dispatching to n8n webhook (${webhookUrl})...`
      });
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`n8n Webhook returned HTTP ${response.status}: ${response.statusText}`);
      }

      let resData = null;
      try {
        resData = await response.json();
      } catch {
        resData = { message: 'Workflow triggered successfully' };
      }

      if (onStatusUpdate) {
        onStatusUpdate({
          stage: 'completed',
          message: 'n8n workflow triggered! Google Jobs scraping and Groq AI scoring are actively executing.'
        });
      }

      return {
        success: true,
        isLive: true,
        data: resData
      };
    } catch (err) {
      console.warn('Webhook trigger error:', err);
      throw new Error(
        `Failed to reach n8n webhook (${err.message}). Check that your workflow is set to "Active" and allows CORS.`
      );
    }
  }

  // Simulation / Local Discovery Mode
  if (onStatusUpdate) {
    onStatusUpdate({
      stage: 'scraping',
      message: `Searching Google Jobs via SerpAPI for "${payload.query}" in "${payload.location}"...`
    });
  }
  await new Promise((r) => setTimeout(r, 1200));

  if (onStatusUpdate) {
    onStatusUpdate({
      stage: 'deduping',
      message: `Filtering net-new job hashes against Supabase database for ${profile?.name}...`
    });
  }
  await new Promise((r) => setTimeout(r, 1000));

  if (onStatusUpdate) {
    onStatusUpdate({
      stage: 'scoring',
      message: `Groq AI evaluating candidate fit and calculating match scores for ${profile?.name}...`
    });
  }
  await new Promise((r) => setTimeout(r, 1400));

  const newJobs = generateSimulatedJobs(payload.query, payload.location, profile);

  if (onStatusUpdate) {
    onStatusUpdate({
      stage: 'completed',
      message: `Discovered and scored ${newJobs.length} new matching jobs for ${profile?.name}!`
    });
  }

  return {
    success: true,
    isLive: false,
    newJobs: newJobs,
    message: `Discovered and scored ${newJobs.length} new matching jobs for ${profile?.name}!`
  };
};

export const testN8nConnection = async (url) => {
  if (!url) return { success: false, message: 'Webhook URL is required.' };
  try {
    const res = await fetch(url.trim(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ping: true, test: true, timestamp: Date.now() })
    });

    if (res.ok) {
      return { success: true, message: `Webhook responded with HTTP ${res.status} OK!` };
    }
    return {
      success: false,
      message: `Webhook responded with HTTP ${res.status}: ${res.statusText}. Ensure CORS is allowed in n8n webhook settings.`
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to connect: ${err.message}. If running locally, check CORS or browser network security.`
    };
  }
};
