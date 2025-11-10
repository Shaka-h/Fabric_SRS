'use strict';
const crypto = require('../Utils/crypto');

class CourseResult {
  static async submit(ctx, data) {
    const existing = await ctx.stub.getState(data.resultId);
    if (existing && existing.length > 0) {
      throw new Error(`Grade already exists for enrollment ${data.enrollmentId} ${existing}`);
    }
    data.type = 'result';

    // Compute hash
    const hash = crypto.hash(JSON.stringify(data));
    const result = {
      ...data,
      status: 'PENDING',
      hash,
    };

    await ctx.stub.putState(String(data.resultId), Buffer.from(JSON.stringify(result)));

    return { message: 'Grade submitted successfully', resultId: data.resultId };
  }

  static async get(ctx, resultId) {
    const resultBytes = await ctx.stub.getState(String(resultId));
    if (!resultBytes || resultBytes.length === 0) {
      throw new Error(`result ${resultId} not found ${resultBytes}`);
    }
    return JSON.parse(resultBytes.toString());
  }

  static async list(ctx) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const results = [];

    let result = await iterator.next();
    while (!result.done) {
      const strValue = result.value.value.toString('utf8');
      try {
        const record = JSON.parse(strValue);
        if (record.type === 'result') results.push(record);
      } catch (err) {
        console.error('Error parsing record:', err);
      }
      result = await iterator.next();
    }

    await iterator.close();
    return results;
  }

  static async verify(ctx, resultId) {
    const bytes = await ctx.stub.getState(resultId);
    if (!bytes || bytes.length === 0) throw new Error('Grade not found');
    const result = JSON.parse(bytes.toString());

    if (result.status === 'OFFICIAL') throw new Error('Cannot verify official grade');

    const recomputed = crypto.hash(JSON.stringify(result));
    if (recomputed !== result.hash) {
      throw new Error('Integrity check failed - hash mismatch');
    }

    result.status = 'OFFICIAL';
    result.verifiedAt = new Date().toISOString();
    await ctx.stub.putState(resultId, Buffer.from(JSON.stringify(result)));

    return { message: 'Grade verified and made official', resultId };
  }

  static async getAuditTrail(ctx, resultId) {
    const iterator = await ctx.stub.getStateByRange('', '');
    const results = [];
    for await (const res of iterator) {
      const record = JSON.parse(res.value.toString());
      if (record.transactionType && res.key.includes(resultId)) {
        results.push(record);
      }
    }
    return results;
  }
}

module.exports = CourseResult;
