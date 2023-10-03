import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestError,
  TestResult,
  TestStep,
} from "@playwright/test/reporter";
import fs from "fs";

type SummaryResult = {
  [key: string]: string;
};

const summary = {
  total_tests: 0,
  passed: 0,
  failed: 0,
  flaky: 0,
  skipped: 0,
};

export default class summaryReport implements Reporter {
  testResults: SummaryResult = {};

  onBegin(config, suite) {
    summary.total_tests = suite.allTests().length;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.testResults[test.id] = test.outcome();
  }

  onStdOut(
    chunk: string | Buffer,
    test: void | TestCase,
    result: void | TestResult
  ): void {
    console.log(chunk);
  }

  onError?(error: TestError): void {
    console.log(error);
  }

  onEnd(): void {
    // console.log(this.testResults);
    // summary.total_tests = Object.keys(this.testResults).length

    // let counts = { expected: 0, unexpected: 0, flaky: 0, skipped: 0 };
    // const results = [...Object.values(this.testResults)];
    // results.forEach((category) => {
    //   counts[category] = (counts[category] || 0) + 1;
    // });
    // console.log(counts);

    const results = [...Object.values(this.testResults)];
    summary.passed = results.filter(x => x === 'expected').length 
    summary.failed = results.filter(x => x === 'unexpected').length 
    summary.flaky = results.filter(x => x === 'flaky').length 
    summary.skipped = results.filter(x => x === 'skipped').length 
    console.log(summary);
    

    // fs.writeFileSync("results.json", JSON.stringify(summary));
  }
}
