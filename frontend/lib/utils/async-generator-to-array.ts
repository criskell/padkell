export const asyncGeneratorToArray = async <T>(
  gen: AsyncGenerator<T>
): Promise<T[]> => {
  const result: T[] = [];

  for await (const item of gen) {
    result.push(item);
  }

  return result;
};
