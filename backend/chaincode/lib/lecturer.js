'use strict';

class Lecturer {
  static async create(ctx, data) {
    const exists = await ctx.stub.getState(data.lecturerId);
    if (exists && exists.length > 0) {
      throw new Error(`lecturer ${data.lecturerId} already exists`);
    }

    data.type = 'lecturer';
    // data.createdDate = new Date().toISOString();
    // data.updatedDate = data.createdDate;
    data.isActive = true;

    await ctx.stub.putState(data.lecturerId, Buffer.from(JSON.stringify(data)));
    return { message: 'lecturer created successfully', lecturerId: data.lecturerId };
  }

  // static async list(ctx) {
  //   const iterator = await ctx.stub.getStateByRange('', '');
  //   const results = [];
  //   for await (const res of iterator) {
  //     const record = JSON.parse(res.value.toString());
  //     if (record.type === 'lecturer') results.push(record);
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
        if (record.type === 'lecturer') results.push(record);
      } catch (err) {
        console.error('Error parsing record:', err);
      }
      result = await iterator.next();
    }

    await iterator.close();
    return results;
  }
}

module.exports = Lecturer;
