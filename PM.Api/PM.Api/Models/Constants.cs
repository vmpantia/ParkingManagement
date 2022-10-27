namespace PM.Api.Models
{
    public class Constants
    {
        public const int STATUS_ENABLED = 0;
        public const int STATUS_DISABLED = 1;
        public const int STATUS_DELETION = 2;

        public const string ERR_REQUEST_NULL = "Request cannot be NULL.";
        public const string ERR_CUSTOMER_NULL = "Customer cannot be NULL.";
        public const string ERR_DATE_NOT_FOUND = "Data not found in database.";
        public const string ERR_NO_CHANGES = "No changes made.";
        public const string ERR_CUSTOMER_EXIST_ENABLE = "Customer Name already exist in database.";
        public const string ERR_CUSTOMER_EXIST_NOT_ENABLE = "Customer Name already exist in database but it's currenlty disabled or for deletion. Please ask admin to enable it.";

    }
}
