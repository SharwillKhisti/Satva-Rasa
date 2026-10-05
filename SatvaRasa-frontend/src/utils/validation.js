export const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    name: /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/,

    phone: /^[6-9]\d{9}$/,

    postalCode: /^[A-Za-z0-9 -]{5,10}$/,

    cityState: /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/,
};

export function validateEmail(email) {
    if (!email.trim()) {
        return "Email is required.";
    }

    if (!validators.email.test(email.trim())) {
        return "Enter a valid email address.";
    }

    return "";
}

export function validatePassword(password) {
    if (!password) {
        return "Password is required.";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters.";
    }

    return "";
}

export function validateName(name, fieldName = "Name") {
    const value = name.trim();

    if (!value) {
        return `${fieldName} is required.`;
    }

    if (value.length < 2) {
        return `${fieldName} must be at least 2 characters.`;
    }

    if (!validators.name.test(value)) {
        return `${fieldName} can only contain letters, spaces, hyphens, or apostrophes.`;
    }

    return "";
}

export function validatePhone(phone) {
    const value = phone.trim();

    if (!value) {
        return "Phone number is required.";
    }

    if (!validators.phone.test(value)) {
        return "Enter a valid 10-digit Indian phone number.";
    }

    return "";
}

export function validateAddress(address) {
    const value = address.trim();

    if (!value) {
        return "Address is required.";
    }

    if (value.length < 5) {
        return "Address must be at least 5 characters.";
    }

    return "";
}

export function validateCityState(value, fieldName) {
    const cleanedValue = value.trim();

    if (!cleanedValue) {
        return `${fieldName} is required.`;
    }

    if (!validators.cityState.test(cleanedValue)) {
        return `${fieldName} can only contain letters, spaces, hyphens, or apostrophes.`;
    }

    return "";
}

export function validatePostalCode(zipCode) {
    const value = zipCode.trim();

    if (!value) {
        return "ZIP / Postal code is required.";
    }

    if (!validators.postalCode.test(value)) {
        return "Enter a valid ZIP / Postal code.";
    }

    return "";
}