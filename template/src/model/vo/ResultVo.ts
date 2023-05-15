export class ResultVo<T = any> {

  public success!: boolean;

  public msg?: string;

  public data?: T;

  constructor(_success: boolean, _msg?: string, _data?: T) {
    this.success = _success;
    this.msg = _msg;
    this.data = _data;
  }


}
