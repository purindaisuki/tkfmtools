const handlePromise = async <T>(
  promise: Promise<T>
): Promise<[T, null] | [null, unknown]> => {
  try {
    const resolve = await promise;
    return [resolve, null];
  } catch (error) {
    return [null, error];
  }
};

export default handlePromise;
