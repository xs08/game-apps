export const validators = {
  required: (message = '此项为必填项') => ({
    required: true,
    message,
  }),

  email: (message = '请输入有效的邮箱地址') => ({
    type: 'email' as const,
    message,
  }),

  minLength: (min: number, message?: string) => ({
    min,
    message: message || `长度不能少于 ${min} 个字符`,
  }),

  maxLength: (max: number, message?: string) => ({
    max,
    message: message || `长度不能超过 ${max} 个字符`,
  }),

  pattern: (pattern: RegExp, message: string) => ({
    pattern,
    message,
  }),
}

