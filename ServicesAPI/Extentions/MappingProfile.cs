using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Property, CreatePropertyDTO>();
        CreateMap<CreatePropertyDTO, Property>();

        CreateMap<Property, PropertyDTO>();
        CreateMap<PropertyDTO, Property>();

        CreateMap<Property, UpdatePropertyDTO>();
        CreateMap<UpdatePropertyDTO, Property>();

        CreateMap<Machine, CreateMachineDTO>();
        CreateMap<CreateMachineDTO, Machine>();

        CreateMap<Machine, MachineDTO>();
        CreateMap<MachineDTO, Machine>();

        CreateMap<Machine, UpdateMachineDTO>();
        CreateMap<UpdateMachineDTO, Machine>();
    }
}
