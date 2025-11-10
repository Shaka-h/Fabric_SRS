'use strict';

class Enrollment {
  static async create(ctx, data) {
    const exists = await ctx.stub.getState(data.enrollmentId);
    if (exists && exists.length > 0) {
      throw new Error(`enrollment ${data.enrollmentId} already exists`);
    }

    data.type = 'enrollment';
    // data.createdDate = new Date().toISOString();
    // data.updatedDate = data.createdDate;
    data.isActive = true;

    await ctx.stub.putState(data.enrollmentId, Buffer.from(JSON.stringify(data)));
    return { message: 'enrollment created successfully', enrollmentId: data.enrollmentId };
  }

  // static async list(ctx) {
  //   const iterator = await ctx.stub.getStateByRange('', '');
  //   const results = [];
  //   for await (const res of iterator) {
  //     const record = JSON.parse(res.value.toString());
  //     if (record.type === 'enrollment') results.push(record);
  //   }
  //   return results;
  // }

  static async list(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const results = [];

    let result = await iterator.next();
    while (!result.done) {
      const strValue = result.value.value.toString('utf8');
      try {
        const record = JSON.parse(strValue);
        if (record.type === 'enrollment') results.push(record);
      } catch (err) {
        console.error('Error parsing record:', err);
      }
      result = await iterator.next();
    }

    await iterator.close();
    return results;
  }
}

module.exports = Enrollment;
