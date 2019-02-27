export interface TestSession {
//  id: number;
//  name: string;
//  role: string;
  testSessionId: string|number;
  testType?: string|number;
  dataUrl?: string;
  test?: Test;
}

export interface Test {
  testId?: string|number;
  dateTime?: string;
}

