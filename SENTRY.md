# Sentry Configuration

## Environment Separation

This project is configured to send events to Sentry from both development and production environments, with proper environment tagging to keep them separated.

### How It Works

The Sentry SDK detects the environment based on the `NUXT_PUBLIC_SENTRY_ENVIRONMENT` environment variable:

- If set to `"production"` → Events are tagged with `environment: production`
- If unset or any other value → Events are tagged with `environment: development`

### Configuration Locations

1. **Production (Cloudflare Workers)**
   - Set in `wrangler.jsonc` under `vars`:

   ```jsonc
   "vars": {
     "NUXT_PUBLIC_SENTRY_ENVIRONMENT": "production"
   }
   ```

   - This is automatically deployed with your Worker

2. **Local Development**
   - Leave `NUXT_PUBLIC_SENTRY_ENVIRONMENT` unset in your `.env` file
   - Or explicitly set to `"development"` if desired

3. **Staging/Preview Deployments**
   - These will automatically use `"development"` unless you create a separate Wrangler environment configuration

### Sentry Dashboard Setup

To properly filter and view events by environment in the Sentry dashboard:

1. **Navigate to your project** at [sentry.io](https://sentry.io)
   - Organization: `daveio`
   - Project: `rebuild-dave-io`

2. **Use Environment Filters**
   - In Issues view, use the environment dropdown to filter:
     - `production` - Only production errors
     - `development` - Only development errors
   - Set up saved searches for quick access

3. **Configure Alerts (Optional)**
   - Go to Alerts → Create Alert Rule
   - Add condition: `Environment equals production`
   - This ensures you're only alerted for production issues

4. **Dashboard Widgets**
   - Create separate dashboard widgets for each environment
   - Use the query filter: `environment:production` or `environment:development`

### Sample Rates

The configuration automatically adjusts sample rates based on environment:

| Setting                     | Production | Development |
| --------------------------- | ---------- | ----------- |
| Traces Sample Rate          | 10%        | 100%        |
| Replay Session Sample Rate  | 10%        | 1%          |
| Replay On Error Sample Rate | 100%       | 100%        |
| Debug Mode                  | Off        | On          |

### Verification

To verify the environment is correctly detected:

1. **In Development:**

   ```bash
   bun dev
   # Trigger an error or event
   # Check Sentry dashboard - should appear under "development" environment
   ```

2. **In Production:**
   - After deployment, events will automatically be tagged as "production"
   - Check the Sentry dashboard's environment filter

3. **Check via Sentry UI:**
   - Go to any issue/event
   - Look for the "Environment" tag in the event details
   - Should show either "development" or "production"

### Troubleshooting

If events are showing up in the wrong environment:

1. **Check the environment variable:**

   ```bash
   # In development
   echo $NUXT_PUBLIC_SENTRY_ENVIRONMENT
   # Should be empty or "development"

   # In production (via Wrangler tail)
   bunx wrangler tail
   # Look for the environment variable in the logs
   ```

2. **Verify Wrangler configuration:**
   - Ensure `wrangler.jsonc` has the correct `vars` section
   - Run `bun run deploy` to update production

3. **Clear local cache:**
   ```bash
   rm -rf .nuxt .output node_modules/.cache
   bun install
   bun dev
   ```

### Best Practices

1. **Never set `NUXT_PUBLIC_SENTRY_ENVIRONMENT=production` locally** unless testing production behavior

2. **Use environment-specific alerts** to avoid noise from development errors

3. **Review sample rates periodically** - adjust based on your quota usage:
   - If hitting quota limits, reduce production sample rates
   - If missing important errors, increase `replaysOnErrorSampleRate`

4. **Consider separate Sentry projects** if you need complete isolation between environments (requires DSN change)

### Related Files

- `sentry.client.config.ts` - Client-side Sentry configuration
- `sentry.server.config.ts` - Server-side Sentry configuration
- `wrangler.jsonc` - Production environment variable definition
- `.env.example` - Local environment variable template
