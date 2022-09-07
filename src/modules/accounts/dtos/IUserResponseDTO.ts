interface IUserResponseDTO {
    email: string;
    name: string;
    driver_license: string;
    id: string;
    avatar: string;
    avatar_url(): string;
}

export { IUserResponseDTO };
