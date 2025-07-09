
const { createClient } = supabase;

// the url and key from supabase
const supabaseUrl = "https://gouoxroquwtldhpajqhz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdW94cm9xdXd0bGRocGFqcWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjQyNjMsImV4cCI6MjA2NzU0MDI2M30.A2_zQoI9GgPTC6fvqLDMjjehIW58OOMSLI2mU9msUog";

const client = createClient(supabaseUrl, supabaseKey);
console.log("✅ Supabase Initialized");


const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");
const msg = document.getElementById("message");


signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    msg.textContent = "❌ Please enter both email and password.";
    msg.style.color = "red";
    return;
  }

  const { data, error } = await client.auth.signUp({ email, password });

  if (error) {
    msg.textContent = "❌ Signup Error: " + error.message;
    msg.style.color = "red";
  } else {
    msg.textContent = "✅ Signup successful!";
    msg.style.color = "green";
    console.log("🟢 Signup Data:", data.user);
  }
});


loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    msg.textContent = "❌ Please enter both email and password.";
    msg.style.color = "red";
    return;
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    msg.textContent = "❌ Login Error: " + error.message;
    msg.style.color = "red";
  } else {
    msg.textContent = "✅ Login successful!";
    msg.style.color = "green";
    console.log("🟢 Login Data:", data.user);
  }
});


googleBtn.addEventListener("click", async () => {
  // ye supabase k dash bord ki link hay
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    msg.textContent = "❌ Google Sign-In Error: " + error.message;
    msg.style.color = "red";
    console.error(error);
  } else {
    msg.textContent = "🔄 Redirecting to Google...";
  }
});