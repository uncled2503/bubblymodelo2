"use client";

export const formatCPF = (value: string) => {
  if (!value) return value;
  const cpf = value.replace(/\D/g, ''); // Remove tudo que não é dígito
  if (cpf.length > 11) return value.slice(0, 14); // Limita o tamanho

  return cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string) => {
  if (!value) return value;
  const phone = value.replace(/\D/g, '');
  if (phone.length > 11) return value.slice(0, 15);

  if (phone.length > 10) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (phone.length > 5) {
    return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (phone.length > 2) {
    return phone.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  } else {
    return phone.replace(/(\d*)/, '($1');
  }
};

export const formatZipCode = (value: string) => {
  if (!value) return value;
  const zip = value.replace(/\D/g, '');
  if (zip.length > 8) return value.slice(0, 9);

  return zip.replace(/(\d{5})(\d)/, '$1-$2');
};