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

export default class summaryReport implements Reporter {
  stats = {
    total_tests: 0,
    passed: 0,
    failed: 0,
    flaky: 0,
    skipped: 0,
  };

  onBegin(config, suite) {
    this.stats.total_tests = suite.allTests().length;
  }

onTestEnd(test: TestCase, result: TestResult): void {
    const outcome = test.outcome();
    const { retry } = result;
    // console.log(outcome, retry);
    console.log(result);
    // console.log(test.results);
    console.log(outcome, result.status, result.retry);

    console.log(test)

    if (outcome === "expected") this.stats.passed += 1;
    if (outcome === "skipped") this.stats.skipped += 1;
    if (outcome === "flaky") {
      this.stats.flaky += 1;
      this.stats.failed -= 1;
    }
    if (outcome === "unexpected" && retry === 0 ) {
        // console.log("            counted as failed");
        this.stats.failed += 1;
    }

  }

   onStdOut(chunk: string|Buffer, test: void|TestCase, result: void|TestResult): void{
    console.log(chunk)
   }


   onError?(error: TestError): void{
    console.log(error)
   }

   onEnd(): void {
    fs.writeFileSync("results.json", JSON.stringify(this.stats));
  }


}
