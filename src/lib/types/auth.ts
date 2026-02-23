// ─── Auth Response Models ────────────────────────────────

export interface UserInfo {
  id: string;
  email?: string | null;
  phone?: string | null;
  email_confirmed_at?: string | null;
  phone_confirmed_at?: string | null;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  created_at?: string | null;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: UserInfo;
}

export interface AuthResponse {
  user?: UserInfo | null;
  session?: Session | null;
}

export interface OAuthURL {
  url: string;
  provider: string;
}

export interface MessageResponse {
  message: string;
}

// ─── Auth Request Models ─────────────────────────────────

export interface SignUpRequest {
  email: string;
  password: string;
  user_metadata?: Record<string, unknown> | null;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface OTPRequest {
  email?: string | null;
  phone?: string | null;
}

export interface GoogleOAuthRequest {
  redirect_url: string;
  scopes?: string | null;
}

export interface OAuthCallbackRequest {
  code: string;
  code_verifier?: string | null;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordUpdateRequest {
  password: string;
}

export interface VerifyOTPRequest {
  token_hash: string;
  otp_type: string;
  token?: string | null;
}

export interface ResendRequest {
  email: string;
  otp_type: string;
}
