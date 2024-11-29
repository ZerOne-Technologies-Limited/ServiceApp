using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Property, CreatePropertyDTO>();
        CreateMap<CreatePropertyDTO, Property>();
    }
}
