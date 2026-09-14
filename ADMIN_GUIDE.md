# Admin Guide: Viewing Customer Enquiry Details

## How to Access Customer Details

### Step 1: Login to Admin Panel
1. Go to your website URL and add `/admin/login` to the end
   - Example: `https://yoursite.com/admin/login`
2. Enter your admin credentials:
   - **Email:** admin@psserviceprovider.com
   - **Password:** admin123
3. Click "Sign In"

### Step 2: Navigate to Enquiries
After logging in, you'll see the **Dashboard**. From here you can:
- Click on **"View All Enquiries"** button, OR
- Click on **"Enquiries"** in the left sidebar menu

### Step 3: View Customer Details

#### In the Enquiries List:
- You'll see a list of all customer enquiries
- Each enquiry shows: Customer name, phone number, service type, location, and status
- **Click on any enquiry** to open the detailed view

#### In the Detail Panel (Right Side):
When you click an enquiry, a detailed panel opens showing:

**1. Status Management**
- Visual workflow: New → Contacted → Quoted → Booked → Completed
- Click any status to change it
- Or click "Move to [Next Status]" button to advance

**2. Customer Details**
- Full Name
- Mobile Number (clickable to call)
- Email (if provided, clickable to email)

**3. Service Details**
- Service Required
- Property Type (Home, Office, Restaurant, etc.)
- Location/Area
- Preferred Date
- Preferred Time
- Customer Message (if they added details)

**4. Quick Actions**
- **Call** - Click to call the customer directly
- **WhatsApp** - Opens WhatsApp with pre-filled message
- **Send Email** - Opens email client (if email provided)

**5. Admin Notes**
- Add internal notes about the enquiry
- Notes are saved and visible for future reference
- Useful for tracking conversations and decisions

**6. Activity Timeline**
- Shows complete history of status changes
- Timestamps for each action
- Helps track the enquiry progress

### Step 4: Navigate Between Enquiries
- Use the **← and → arrows** at the top of the detail panel
- Or click different enquiries in the left list
- The detail panel updates instantly

### Step 5: Filter and Search
Use the filters at the top to find specific enquiries:
- **Search box:** Search by name, phone, email, or location
- **Status filter:** View only new, contacted, quoted, booked, or completed
- **Service filter:** View only specific service types
- **Property type filter:** View only residential or commercial
- **Sort:** Newest first or oldest first

## Dashboard Quick View

The **Dashboard** also shows:
- **Stats cards:** Count of new, contacted, booked, and completed enquiries
- **Recent enquiries:** Last 5 enquiries with quick details
- Click any enquiry in the dashboard to go to the full enquiries page

## Status Workflow

The official workflow is:
1. **New** - Customer just submitted the enquiry
2. **Contacted** - You've contacted the customer
3. **Quoted** - You've sent a quotation
4. **Booked** - Customer confirmed booking
5. **Completed** - Service delivered

You can change status at any time by clicking the status buttons in the detail panel.

## Tips

- **Check the "New" enquiries first** - These need immediate attention
- **Add notes** when you contact customers or make decisions
- **Use WhatsApp integration** for quick communication
- **Filter by status** to focus on what needs action
- **Use the search** to find specific customers quickly

## Mobile Access

The admin panel works on mobile devices too:
- The layout adapts to smaller screens
- You can view and manage enquiries on the go
- Tap an enquiry to see full details
- Use the back button to return to the list

## Demo Data

Currently, the system uses **localStorage** for demo purposes. This means:
- Data persists in the browser
- Clearing browser data will reset enquiries
- For production, you'll need a backend database (PostgreSQL as per PRD)

## Next Steps for Production

Before going live:
1. Set up PostgreSQL database
2. Configure proper authentication (not demo credentials)
3. Set up email notifications
4. Configure WhatsApp Business API (optional)
5. Add server-side validation and security
6. Set up backups and data retention policies

---

**Need Help?**
The admin panel is designed to be intuitive. If you need additional features or have questions about the workflow, refer to the PRD document or contact the development team.
