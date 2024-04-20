using System.Runtime.Serialization;

namespace dotnetWebAPI.Services
{
    [Serializable]
    internal class UserUnknownException : Exception
    {
        public UserUnknownException()
        {
        }

        public UserUnknownException(string? message) : base(message)
        {
        }

        public UserUnknownException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected UserUnknownException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}