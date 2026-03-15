Improve the National Deepfake Fingerprint Registry module so that it becomes fully functional and not just a UI mock.

Implement the complete workflow for submitting and storing fingerprint entries.

Functional Workflow

When a user uploads a file or enters a manual hash:

Generate a SHA-256 cryptographic hash of the uploaded file.

Create a unique fingerprint ID in the format:

FP-YYYYMMDD-XXXX

Example:

FP-20260315-0001

Store the following data fields as a registry entry:

fingerprintId
hash
contentType
category
timestamp
status
platform

Example entry:

Fingerprint ID: FP-20260315-0001
Hash: SHA256 hash value
Content Type: AI Text / Image / Video / Audio
Category: Financial Fraud / Political Manipulation / Identity Theft
Timestamp: submission time
Status: Monitoring
Platform: Unknown
Storage Implementation

Implement persistent storage using one of the following:

• local application state
• browser localStorage
• Supabase database
• backend API endpoint

Registry entries must persist after page refresh.

Submission Logic

When the Submit to Registry button is clicked:

Validate that either a file OR a manual hash was provided.

If a file is uploaded:

Compute SHA-256 hash

Create the registry entry object.

Example:

{
 fingerprintId: "FP-20260315-0001",
 hash: "generated_hash",
 contentType: selected_content_type,
 category: selected_category,
 timestamp: current_time,
 status: "Monitoring",
 platform: "Unknown"
}

Save the entry to the registry database.

Registry Table Update

After submission:

Append the new entry to Registry Entries table.

Display the following columns:

Fingerprint ID
Hash
Content Type
Category
Timestamp
Status
Platform

Sort entries by latest timestamp first.

Counter Updates

Automatically update dashboard statistics:

Total Fingerprints
Active Threats
Contained
Neutralized
Today's Matches

Example logic:

Total Fingerprints = registryEntries.length
File Upload Logic

The upload component should support:

image
video
audio
text files

Display progress messages:

Hashing file...
Hash generated successfully
Submitting fingerprint...
Fingerprint stored successfully
Manual Hash Entry

If the user manually enters a hash:

Skip file hashing and directly create a registry entry.

Search and Filter

Implement working filters for:

Search by hash
Search by fingerprint ID
Filter by content type
Filter by status
Filter by time range

Filtering must dynamically update the registry table.

Export Functionality

Make Export Database download a JSON or CSV file containing all registry entries.

Additional Requirement

Ensure that:

• Drag-and-drop file upload works correctly
• Registry entries appear immediately after submission
• Data persists between sessions
• Hash generation uses SHA-256
• Registry entries are stored in structured format

Desired Result

The National Deepfake Fingerprint Registry should function like a real forensic registry where every uploaded file produces a unique fingerprint and appears in the registry table immediately.