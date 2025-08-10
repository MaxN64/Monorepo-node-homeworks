function validateCredentials(emailInput, passwordInput) {
  const email = String(emailInput || "")
    .trim()
    .toLowerCase();
  const password = String(passwordInput || "");

  const emailRegex =
    /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/u;

  if (!email || !emailRegex.test(email)) {
    return { ok: false, error: "Некорректный email" };
  }
  if (!password || password.length < 8) {
    return { ok: false, error: "Пароль должен быть не короче 8 символов." };
  }
  return { ok: true, email, password };
}

module.exports = { validateCredentials };
