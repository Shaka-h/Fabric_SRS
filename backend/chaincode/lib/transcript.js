'use strict';

class Trascript {
  static async generate(ctx, data) {
    const exists = await ctx.stub.getState(data.transcriptId);
    if (exists && exists.length > 0) {
      throw new Error(`transcript ${data.transcriptId} already exists`);
    }

    data.type = 'transcript';
    data.createdDate = new Date().toISOString();
    data.updatedDate = data.createdDate;
    data.isActive = true;

    await ctx.stub.putState(data.transcriptId, Buffer.from(JSON.stringify(data)));
    return { message: 'transcript created successfully', transcriptId: data.transcriptId };
  }

  // static async list(ctx) {
  //   const iterator = await ctx.stub.getStateByRange('', '');
  //   const results = [];
  //   for await (const res of iterator) {
  //     const record = JSON.parse(res.value.toString());
  //     if (record.type === 'transcript') results.push(record);
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
        if (record.type === 'transcript') results.push(record);
      } catch (err) {
        console.error('Error parsing record:', err);
      }
      result = await iterator.next();
    }

    await iterator.close();
    return results;
  }
}

module.exports = Trascript;
