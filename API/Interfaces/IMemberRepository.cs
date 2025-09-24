using API.Entities;

namespace API.Interfaces
{
    public interface IMemberRepository
    {
        void Update(Member member);
        Task<bool> SaveALlAsync();
        Task<IReadOnlyList<Member>> GetMembersAsync();
        Task<Member?> GetMemberAsync(string id);
        Task<IReadOnlyList<Photo>> GetPhotosFromMemberAsync(string id);
    }
}
