export async function greet(name: string): Promise<string> {
    return `Hello, ${name}!`;
}

export async function scream_greeting(name: string): Promise<string> {
    return name.toUpperCase();
}