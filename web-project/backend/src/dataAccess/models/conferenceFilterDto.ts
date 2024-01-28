import paginationDto from "./paginationDto";

export default class conferenceFilterDto extends paginationDto {
    conferenceId!: number | null

    constructor(obj: Partial<conferenceFilterDto>) {
        super();
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)
    }
}