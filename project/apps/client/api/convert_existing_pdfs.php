<?php
/**
 * Script to convert all existing PDFs to images
 * Run this manually on the server: php convert_existing_pdfs.php
 */

// Database configuration
$db_host = 'localhost';
$db_user = 'invidata';
$db_pass = 'Dhruvil@123';
$db_name = 'GrowthTest';

echo "Starting conversion of existing PDFs...\n\n";

// Connect to database
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get all published unicorn deals that have PDFs but no images
$query = "
    SELECT u1.unicornDealID, u1.tudTempUdID, u2.udPitchDeck, u2.udPitchDeckImages, u2.udProductDeck, u2.udProductDeckImages
    FROM unicorndeals u1
    JOIN unicorndeals2 u2 ON u1.unicornDealID = u2.unicornDealID
    WHERE (u2.udPitchDeck IS NOT NULL AND u2.udPitchDeck != '' AND (u2.udPitchDeckImages IS NULL OR u2.udPitchDeckImages = ''))
       OR (u2.udProductDeck IS NOT NULL AND u2.udProductDeck != '' AND (u2.udProductDeckImages IS NULL OR u2.udProductDeckImages = ''))
    ORDER BY u1.unicornDealID ASC
";

$result = $conn->query($query);
$totalDeals = $result->num_rows;

echo "Found $totalDeals deals with PDFs that need conversion\n\n";

if ($totalDeals == 0) {
    echo "No PDFs to convert. Exiting.\n";
    $conn->close();
    exit(0);
}

$successCount = 0;
$errorCount = 0;

while ($deal = $result->fetch_object()) {
    echo "Processing unicornDealID: {$deal->unicornDealID}, tudTempUdID: {$deal->tudTempUdID}\n";
    
    $hasErrors = false;
    
    // Convert pitch deck if exists and no images
    if (!empty($deal->udPitchDeck) && empty($deal->udPitchDeckImages)) {
        echo "  - Converting Pitch Deck: {$deal->udPitchDeck}... ";
        
        $cmd = "/usr/bin/php /var/www/growthtest/api/index.php founder/Startup/convertPitchDeckWorker {$deal->unicornDealID} {$deal->tudTempUdID} 2>&1";
        exec($cmd, $output, $returnCode);
        
        // Wait a moment for conversion to complete
        sleep(2);
        
        // Check if images were created
        $check = $conn->query("SELECT udPitchDeckImages FROM unicorndeals2 WHERE unicornDealID = {$deal->unicornDealID}");
        $checkRow = $check->fetch_object();
        if (!empty($checkRow->udPitchDeckImages)) {
            echo "SUCCESS\n";
        } else {
            echo "FAILED\n";
            $hasErrors = true;
        }
    }
    
    // Convert product deck if exists and no images
    if (!empty($deal->udProductDeck) && empty($deal->udProductDeckImages)) {
        echo "  - Converting Product Deck: {$deal->udProductDeck}... ";
        
        $cmd = "/usr/bin/php /var/www/growthtest/api/index.php founder/Startup/convertProductDeckWorker {$deal->unicornDealID} {$deal->tudTempUdID} 2>&1";
        exec($cmd, $output, $returnCode);
        
        // Wait a moment for conversion to complete
        sleep(2);
        
        // Check if images were created
        $check = $conn->query("SELECT udProductDeckImages FROM unicorndeals2 WHERE unicornDealID = {$deal->unicornDealID}");
        $checkRow = $check->fetch_object();
        if (!empty($checkRow->udProductDeckImages)) {
            echo "SUCCESS\n";
        } else {
            echo "FAILED\n";
            $hasErrors = true;
        }
    }
    
    if ($hasErrors) {
        $errorCount++;
    } else {
        $successCount++;
    }
    
    echo "\n";
}

$conn->close();

echo "========================================\n";
echo "Conversion complete!\n";
echo "Total deals processed: $totalDeals\n";
echo "Successful: $successCount\n";
echo "Failed: $errorCount\n";
echo "========================================\n";
?>
