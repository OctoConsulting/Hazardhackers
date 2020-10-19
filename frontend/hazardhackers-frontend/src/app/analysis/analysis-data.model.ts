export class AnalysisData {
    image: string;
    type: string;
    data: ResponseData;
}

export class ResponseData{
    passed: Boolean;
    percentage: number;
    people_fail: number;
    people_pass: number;
}