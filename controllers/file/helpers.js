exports.formatPayload = (files) => {
  return files.map(
    ({ originalname, mimetype, size, buffer }) => {
      const encodedBinary = Buffer.from(buffer).toString("base64");

      return {
        type: mimetype,
        name: originalname,
        size,
        content: encodedBinary
      };
    }
  );
}