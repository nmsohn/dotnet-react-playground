namespace Reactivities.Application.Core;

public class PagedList<T, TCursor>
{
    public List<T> Items { get; set; } = new List<T>();
    public TCursor? NextCur { get; set; }
}