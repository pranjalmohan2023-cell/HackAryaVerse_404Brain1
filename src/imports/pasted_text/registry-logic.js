Fix the National Deepfake Fingerprint Registry so that submitted fingerprints are correctly stored and displayed in the Registry Entries table.

The registry system must maintain a persistent list of entries using React state and browser localStorage.

1 Initialize Registry Storage

Create a global state variable called:

registryEntries

This should be an array.

On page load:

Load registryEntries from localStorage
If localStorage is empty initialize an empty array

Example logic:

const [registryEntries, setRegistryEntries] = useState(
 JSON.parse(localStorage.getItem("registryEntries")) || []
);
2 Submission Logic

When Submit to Registry is clicked:

Validate inputs

Generate fingerprint ID

Generate SHA-256 hash if a file is uploaded

Create entry object

Example structure:

const newEntry = {
 fingerprintId: generatedId,
 hash: computedHash,
 contentType: selectedType,
 category: selectedCategory,
 timestamp: new Date().toISOString(),
 status: "Monitoring",
 platform: "Unknown"
};
3 Update Registry State

After creating the entry:

const updatedEntries = [newEntry, ...registryEntries];

setRegistryEntries(updatedEntries);
localStorage.setItem("registryEntries", JSON.stringify(updatedEntries));

This ensures persistence.

4 Render Registry Table

The Registry Entries section must dynamically render registryEntries.

Example structure:

registryEntries.map(entry => (
<tr>
<td>{entry.fingerprintId}</td>
<td>{entry.hash}</td>
<td>{entry.contentType}</td>
<td>{entry.category}</td>
<td>{entry.timestamp}</td>
<td>{entry.status}</td>
<td>{entry.platform}</td>
</tr>
))

If registryEntries is empty, display:

"No fingerprint entries registered yet."
5 Auto Refresh After Submission

After submitting a fingerprint:

• Clear input form
• Reload registry table
• Update dashboard counters

Counters should update as:

Total Fingerprints = registryEntries.length
6 File Upload Hashing

If a file is uploaded:

Generate SHA-256 hash using:

crypto.subtle.digest("SHA-256", fileBuffer)

Use this hash value in the registry entry.

7 Search and Filter Integration

Search and filters should operate on registryEntries state, not on static UI data.

Filtering should dynamically update the table.

8 Persistence

Registry entries must remain visible after:

• page refresh
• browser restart
• tab close/reopen

This must be achieved by syncing state with localStorage.

9 Desired Behavior

When a user submits a fingerprint:

1 Upload file or hash
2 Generate SHA-256 hash
3 Create registry entry
4 Store entry in registryEntries state
5 Save entry in localStorage
6 Immediately display entry in Registry Entries table