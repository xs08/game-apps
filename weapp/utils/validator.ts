// 验证工具

/**
 * 验证用户名
 */
export function validateUsername(username: string): boolean {
  if (!username || username.trim().length === 0) {
    return false;
  }
  // 用户名长度 3-20 字符，只能包含字母、数字、下划线
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
}

/**
 * 验证密码
 */
export function validatePassword(password: string): boolean {
  if (!password || password.length < 6) {
    return false;
  }
  // 密码至少 6 位
  return password.length >= 6;
}

/**
 * 验证邮箱
 */
export function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * 验证房间码
 */
export function validateRoomCode(code: string): boolean {
  if (!code || code.trim().length === 0) {
    return false;
  }
  // 房间码长度 4-20 字符
  return code.trim().length >= 4 && code.trim().length <= 20;
}

/**
 * 验证手机号
 */
export function validatePhone(phone: string): boolean {
  if (!phone) {
    return false;
  }
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
}

