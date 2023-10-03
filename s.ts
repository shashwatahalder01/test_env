import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

function getDuration(startTime: number, endTime: number) {
  const ms = endTime - startTime
  const dms = ms % 1000
  const sec = (ms - dms) / 1000
  const ds = sec % 60
  const min = (sec - ds) / 60
  return `${min}m ${ds}s`
}
type SummaryResult = {
  [key: string]: string
}

type TestOptions = {
  outputFile?: string
}

class SummaryReporter implements Reporter {
  private options:TestOptions = {}
  private suiteStartTime: number = 0
  private suiteEndTime: number = 0
  private testResults: SummaryResult = {}
  constructor(options: TestOptions) {
    if(options) {
      Object.assign(this.options, options)
    }
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(test.outcome());
    
    this.testResults[test.id] = test.outcome()
    console.log(this.testResults);
    
    const startTime = result.startTime.getTime()
    const duration = result.duration
    const endTime = startTime + result.duration
    this.suiteStartTime = 0 == this.suiteStartTime ? startTime : Math.min(this.suiteStartTime, startTime)
    this.suiteEndTime = Math.max(this.suiteEndTime, endTime)
  }

  onEnd(result: FullResult) {
    let all = 0
    const outcome:any = {
      skipped:0,
      expected:0,
      unexpected:0,
      flaky:0
    }

    console.log(this.testResults);
    

    for(const id in this.testResults) {
      all++
      const status = this.testResults[id]
      if(!outcome[status]) {
        outcome[status] = 0
      }
      outcome[status]++
    }

    const duration = getDuration(this.suiteStartTime, this.suiteEndTime)
    const summary = `All ${all} ✅ ${outcome['expected']} ❌ ${outcome['unexpected']} ⚠ ${outcome['flaky']} ⏭  ${outcome['skipped']} ⏱  ${duration}`
    
    if(this.options.outputFile) {
      const outputFile = this.options.outputFile
      if(!fs.existsSync(path.dirname(outputFile))) {
        fs.mkdirSync(path.dirname(outputFile), {recursive:true})
      }
      fs.writeFileSync(outputFile, summary)
    } else {
      console.log(summary)
    }
  }
}

export default SummaryReporter;
