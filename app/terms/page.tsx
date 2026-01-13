"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Terms = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Legal & Policies
        </h1>
        <p className="text-muted-foreground mb-8">
          Please read these terms carefully before using GObid
        </p>

        <Tabs defaultValue="terms" className="space-y-6">
          <TabsList className="w-full justify-start flex-wrap h-auto gap-2">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="refund">Refund Policy</TabsTrigger>
            <TabsTrigger value="escrow">Escrow Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="terms">
            <Card className="p-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>Terms of Service</h2>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>

              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using GObid, you accept and agree to be bound
                by the terms and provision of this agreement. If you do not
                agree to abide by these terms, please do not use this service.
              </p>

              <h3>2. Description of Service</h3>
              <p>
                GObid provides an online auction platform where users can buy
                and sell items through a bidding process. Our service includes
                but is not limited to:
              </p>
              <ul>
                <li>Online auction listings</li>
                <li>Real-time bidding system</li>
                <li>Secure escrow payment processing</li>
                <li>Buyer and seller communication tools</li>
                <li>Dispute resolution services</li>
              </ul>

              <h3>3. User Registration</h3>
              <p>
                To use certain features of the Service, you must register for an
                account. When you register, you agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your password secure and confidential</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
              </ul>

              <h3>4. Bidding Rules</h3>
              <p>
                All bids placed on GObid are legally binding. By placing a bid,
                you agree to:
              </p>
              <ul>
                <li>Honor your bid if you are the winning bidder</li>
                <li>Complete payment within 48 hours of winning</li>
                <li>Not engage in bid manipulation or shill bidding</li>
              </ul>

              <h3>5. Seller Obligations</h3>
              <p>As a seller on GObid, you agree to:</p>
              <ul>
                <li>Provide accurate descriptions of your items</li>
                <li>Ship items within the specified timeframe</li>
                <li>Respond to buyer inquiries promptly</li>
                <li>Accept returns as per our refund policy</li>
              </ul>

              <h3>6. Fees and Payments</h3>
              <p>
                GObid charges a 5% success fee on completed sales. This fee is
                deducted from the final sale price before funds are released to
                the seller.
              </p>

              <h3>7. Prohibited Activities</h3>
              <p>Users are prohibited from:</p>
              <ul>
                <li>Listing counterfeit or illegal items</li>
                <li>Engaging in fraudulent activities</li>
                <li>Circumventing our escrow system</li>
                <li>Harassing other users</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="p-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>Privacy Policy</h2>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>

              <h3>1. Information We Collect</h3>
              <p>We collect information you provide directly to us:</p>
              <ul>
                <li>Account information (name, email, phone number)</li>
                <li>Payment information</li>
                <li>Transaction history</li>
                <li>Communication preferences</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process your transactions</li>
                <li>Send you important updates</li>
                <li>Improve our services</li>
                <li>Prevent fraud and abuse</li>
              </ul>

              <h3>3. Information Sharing</h3>
              <p>
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul>
                <li>Payment processors to complete transactions</li>
                <li>Law enforcement when required by law</li>
                <li>Service providers who assist our operations</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your
                personal information, including encryption and secure data
                storage.
              </p>

              <h3>5. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="refund">
            <Card className="p-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>Refund Policy</h2>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>

              <h3>1. Buyer Protection</h3>
              <p>
                GObid's escrow system protects buyers by holding payment until
                the item is received and confirmed. You may request a refund if:
              </p>
              <ul>
                <li>The item was not received</li>
                <li>The item significantly differs from the description</li>
                <li>The item is damaged or defective</li>
              </ul>

              <h3>2. Refund Process</h3>
              <p>To request a refund:</p>
              <ol>
                <li>Open a dispute within 7 days of receiving the item</li>
                <li>Provide evidence supporting your claim</li>
                <li>Allow the seller to respond</li>
                <li>Our team will review and make a decision</li>
              </ol>

              <h3>3. Refund Timeline</h3>
              <p>
                Once a refund is approved, funds will be returned to your GObid
                wallet within 3-5 business days. Withdrawal to your bank account
                may take an additional 1-3 business days.
              </p>

              <h3>4. Non-Refundable Situations</h3>
              <p>Refunds may not be granted if:</p>
              <ul>
                <li>You confirmed receipt without raising concerns</li>
                <li>The dispute is filed after 7 days</li>
                <li>The item matches the description provided</li>
                <li>You simply changed your mind</li>
              </ul>

              <h3>5. Seller Disputes</h3>
              <p>
                Sellers may dispute refund requests by providing evidence that
                the item was delivered as described. Our dispute resolution team
                will review all evidence before making a final decision.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="escrow">
            <Card className="p-6 prose prose-neutral dark:prose-invert max-w-none">
              <h2>Escrow Terms</h2>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>

              <h3>1. What is Escrow?</h3>
              <p>
                GObid's escrow service holds the buyer's payment securely until
                the transaction is completed successfully. This protects both
                buyers and sellers from fraud.
              </p>

              <h3>2. How It Works</h3>
              <ol>
                <li>
                  <strong>Buyer Wins Auction:</strong> Payment is collected and
                  held in escrow
                </li>
                <li>
                  <strong>Seller Ships Item:</strong> Seller ships the item and
                  provides tracking
                </li>
                <li>
                  <strong>Buyer Confirms:</strong> Buyer confirms receipt and
                  satisfaction
                </li>
                <li>
                  <strong>Funds Released:</strong> Payment is released to the
                  seller
                </li>
              </ol>

              <h3>3. Escrow Timeline</h3>
              <ul>
                <li>Seller has 3 days to ship after payment is received</li>
                <li>Buyer has 7 days after delivery to confirm or dispute</li>
                <li>
                  Auto-release occurs 7 days after confirmed delivery if no
                  dispute
                </li>
              </ul>

              <h3>4. Escrow Fees</h3>
              <p>
                The escrow service is included in our standard 5% success fee.
                There are no additional charges for escrow protection.
              </p>

              <h3>5. Dispute Resolution</h3>
              <p>
                If a dispute arises, funds remain in escrow until our team
                reviews the case and makes a determination. Both parties will
                have the opportunity to present evidence.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Terms;
