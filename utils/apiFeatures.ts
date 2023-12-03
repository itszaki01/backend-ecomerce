import mongoose, { Query, QuerySelector } from "mongoose";
import { TQueryParams, TQuerySortParams } from "../@types/QueryParams.type";
import { TPaginateResults } from "../@types/ResponseData.type";
import { TProductSchema } from "../@types/Product.type";

export class ApiFeatures<T> {
    totalResults = 0;
    constructor(
        public mongooseQuery: mongoose.FilterQuery<T>,
        public mongooseQueryCalcer: mongoose.FilterQuery<T>,
        public queryString: TQueryParams,
        public paginateResults?: TPaginateResults
    ) {}
    async filter(filterBy?: TQueryParams) {
        if (!this.queryString.keyword) {
            //1:Filters
            const queryFilters = { ...this.queryString } as TQueryParams;
            const querySortParams: TQuerySortParams = ["limit", "page", "sort", "fields"];
            querySortParams.forEach((key) => delete queryFilters[key]);
            //apply filtraion with [get,gt,lte,lt]
            const queryStr = JSON.stringify(queryFilters).replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

            if (!filterBy) {
                this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
                this.mongooseQueryCalcer = await this.mongooseQueryCalcer.find(JSON.parse(queryStr));
            } else {
                this.mongooseQuery = this.mongooseQuery.find(filterBy);
                this.mongooseQueryCalcer = await this.mongooseQueryCalcer.find(filterBy);
            }

            this.totalResults = this.mongooseQueryCalcer.length;
        }
        return this;
    }

    sort() {
        //4:sortBy
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.replaceAll(",", " ");
            this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery.sort("-createdAt");
        }
        return this;
    }

    fieldsLimit() {
        //4:Fileds Limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.replaceAll(",", " ");
            this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery.select("-__v");
        }
        return this;
    }

    async search(searchName?: string, payload?: TQueryParams) {
        if (this.queryString.keyword) {
            const keyword = this.queryString.keyword;
            let query = {};
            if (searchName === "ByTitle") {
                query = {
                    $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],
                };
            } else if(searchName === 'ByName'){
                
                query = {
                    name: { $regex: keyword, $options: "i" },
                    ...payload
                };
                console.log(query);
            }else {
                query = {
                    name: { $regex: keyword, $options: "i" },
                    ...payload
                };
            }

            this.mongooseQuery = this.mongooseQuery.find(query);
            this.mongooseQueryCalcer = await this.mongooseQueryCalcer.find(query);
            this.totalResults = this.mongooseQueryCalcer.length;
        }
        return this;
    }

    pagination() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 5;
        const skip = (page - 1) * limit;
        const totalPages = Math.ceil(this.totalResults / limit);
        this.paginateResults = {
            limit: limit,
            currentPage: page,
            totalPages: Math.ceil(this.totalResults / limit),
            totalResults: this.totalResults,
            next: page === totalPages ? null : page + 1,
            prev: page - 1 === 0 ? null : page - 1,
        };
        this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
}
