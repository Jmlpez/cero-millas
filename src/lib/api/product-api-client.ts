import { AddTagRequest } from '@/contracts/product/add-tag-request';
import { CategoryDto } from '@/contracts/product/category-dto';
import { CreateCategoryRequest } from '@/contracts/product/create-category-request';
import { CreateProductPackDto } from '@/contracts/product/create-product-pack-dto';
import { ProductDto } from '@/contracts/product/product-dto';
import { ProvinceProductDto } from '@/contracts/product/province-product-dto';
import { TagDto } from '@/contracts/product/tag-dto';
import { PagedResult } from '@/types/common';
import { BaseApiClient } from '@lib/api/base-api-client';
import { HttpClient } from '@services/http-client';
import { PaginationState } from '@tanstack/react-table';
import { Filter, OrderBy } from 'odata-query';

export class ProductApiClient extends BaseApiClient {
    constructor(httpClient: HttpClient) {
        super('api/inventory/products', httpClient);
    }
    //endregion

    //region Products Images
    async uploadImages(productId: string, images: File[]): Promise<void> {
        const formData = new FormData();
        images.forEach((images) => formData.append('images', images));
        return this.httpClient.post<void>(this.buildEndpoint(`${productId}/upload-images`), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    async removeImages(productId: string, imageIds: string[]): Promise<void> {
        return this.httpClient.delete<void>(this.buildEndpoint(`${productId}/images`), imageIds);
    }

    //endregion

    //region Province Products
    async getAllProvinceProducts(
        pagination?: PaginationState,
        sorting?: OrderBy<ProvinceProductDto>,
        filters?: Filter<ProvinceProductDto>,
    ): Promise<PagedResult<ProvinceProductDto[]>> {
        return this.getAllOdata(pagination, sorting, filters, 'province');
        // return this.httpClient.get<PagedResult<CategoryDto[]>>(this.buildEndpoint('categories', this.buildPagination(pagination)));
    }

    async getProvinceProductsByProvince(provinceId: number | string, pagination?: PaginationState): Promise<PagedResult<ProvinceProductDto[]>> {
        return this.httpClient.get<PagedResult<ProvinceProductDto[]>>(this.buildEndpoint(`province/${provinceId}`, this.buildPagination(pagination)));
    }

    async getProvinceProductsByProduct(
        productId: string,
        pagination?: PaginationState,
        sorting?: OrderBy<ProvinceProductDto>,
        filters?: Filter<ProvinceProductDto>,
    ): Promise<PagedResult<ProvinceProductDto[]>> {
        return this.getAllOdata(pagination, sorting, filters, `${productId}/province`);
        // return this.httpClient.get<PagedResult<ProvinceProductDto[]>>(this.buildEndpoint(`${productId}/province`, this.buildPagination(pagination)));
    }

    async getProvinceProduct(provinceId: number | string, productId: string): Promise<ProvinceProductDto> {
        return this.httpClient.get<ProvinceProductDto>(this.buildEndpoint(`province/${provinceId}/${productId}`));
    }

    async updateProvinceProduct(provinceId: number | string, productId: string, data: Partial<ProvinceProductDto>): Promise<ProvinceProductDto> {
        return this.httpClient.put<ProvinceProductDto>(this.buildEndpoint(`province/${provinceId}/${productId}`), data);
    }

    //endregion

    //region Pack
    async createPack(data: CreateProductPackDto): Promise<ProductDto> {
        return this.httpClient.post<ProductDto>(this.buildEndpoint('packs'), data);
    }

    async updatePack(productId: string, data: CreateProductPackDto): Promise<ProductDto> {
        return this.httpClient.put<ProductDto>(this.buildEndpoint(`packs/${productId}`), data);
    }

    async filterProducts(searchTerm: string, abortSignal?: AbortSignal): Promise<ProductDto[]> {
        return this.httpClient.get<ProductDto[]>(this.buildEndpoint('filter', { searchTerm }), { signal: abortSignal });
    }

    //endregion

    //region Tags
    async addTags(productId: string, data: AddTagRequest): Promise<void> {
        return this.httpClient.post<void>(this.buildEndpoint(`${productId}/tags`), data);
    }

    async searchTags(searchTerm: string): Promise<TagDto[]> {
        return this.httpClient.get<TagDto[]>(this.buildEndpoint('tags', { searchTerm }));
    }

    //endregion

    //region Categories
    async getCategoryById(id: string): Promise<CategoryDto> {
        return this.httpClient.get<CategoryDto>(this.buildEndpoint(`categories/${id}`));
    }

    async getAllCategories(
        pagination?: PaginationState,
        sorting?: OrderBy<CategoryDto>,
        filters?: Filter<CategoryDto>,
    ): Promise<PagedResult<CategoryDto[]>> {
        return this.getAllOdata(pagination, sorting, filters, 'categories');
        // return this.httpClient.get<PagedResult<CategoryDto[]>>(this.buildEndpoint('categories', this.buildPagination(pagination)));
    }

    async createProductCategory(data: CreateCategoryRequest): Promise<CategoryDto> {
        return this.httpClient.post<CategoryDto>(this.buildEndpoint('categories'), data);
    }

    async updateProductCategory(id: string, data: CreateCategoryRequest): Promise<CategoryDto> {
        return this.httpClient.put<CategoryDto>(this.buildEndpoint(`categories/${id}`), data);
    }

    //endregion

    //TODO: Add actions in batch
}
