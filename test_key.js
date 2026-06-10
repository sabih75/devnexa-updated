const parts = {
  prefix: "re_dgTZwC3X_Cucb",
  middle1: ["L", "l", "I", "1"],
  middle2: "t8rd4",
  middle3: ["h", "H"],
  middle4: ["F", "f"],
  suffix: "xNJCMp7X9CPm"
};

const keys = [];
for (const m1 of parts.middle1) {
  for (const m3 of parts.middle3) {
    for (const m4 of parts.middle4) {
      keys.push(`${parts.prefix}${m1}${parts.middle2}${m3}${m4}${parts.suffix}`);
    }
  }
}

async function testKeys() {
  console.log(`Testing ${keys.length} keys...`);
  for (const key of keys) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        headers: {
          Authorization: `Bearer ${key}`
        }
      });
      const data = await res.json();
      if (res.status !== 400 || (data.message && !data.message.includes("API key is invalid"))) {
        console.log(`MATCH FOUND: ${key} -> Status: ${res.status}`, data);
      } else {
        console.log(`${key} -> Invalid`);
      }
    } catch (err) {
      console.log(`${key} -> Error:`, err.message);
    }
  }
}

testKeys();
