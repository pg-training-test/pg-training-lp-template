/**
 * PG Training - ECサイト商品詳細ページ JavaScript
 * GTMでのイベントトラッキングとECサイト機能の実装
 */

// ページ読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('PG Fashion - Product Detail Page Loaded');
    
    // dataLayerの初期化（GTM用）
    window.dataLayer = window.dataLayer || [];
    
    // ========================================
    // 商品データ（GA4 ecommerce用）
    // ========================================
    const productData = {
        item_id: 'DJ-001',
        item_name: 'オーバーサイズデニムジャケット',
        item_category: 'アウター',
        item_category2: 'ジャケット',
        item_brand: 'PG FASHION',
        price: 12900,
        currency: 'JPY',
        discount: 6000,
        quantity: 1
    };
    
    // 選択された商品オプション
    let selectedOptions = {
        color: 'indigo',
        size: 'M',
        quantity: 1
    };
    
    // ========================================
    // ページビューイベント（商品詳細表示）
    // ========================================
    window.dataLayer.push({
        'event': 'view_item',
        'ecommerce': {
            'items': [productData]
        }
    });
    
    // ========================================
    // 画像ギャラリー機能
    // ========================================
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // アクティブクラスの切り替え
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // メイン画像の変更
            const newImageSrc = this.dataset.image;
            mainImage.src = newImageSrc;
            
            // イベント送信
            window.dataLayer.push({
                'event': 'product_image_view',
                'event_category': 'engagement',
                'event_action': 'view_image',
                'event_label': newImageSrc
            });
        });
    });
    
    // ========================================
    // カラー選択
    // ========================================
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // アクティブクラスの切り替え
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            selectedOptions.color = this.dataset.color;
            
            // イベント送信
            window.dataLayer.push({
                'event': 'select_item_option',
                'event_category': 'product_interaction',
                'event_action': 'select_color',
                'event_label': selectedOptions.color
            });
            
            console.log('Color selected:', selectedOptions.color);
        });
    });
    
    // ========================================
    // サイズ選択
    // ========================================
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // アクティブクラスの切り替え
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            selectedOptions.size = this.dataset.size;
            
            // イベント送信
            window.dataLayer.push({
                'event': 'select_item_option',
                'event_category': 'product_interaction',
                'event_action': 'select_size',
                'event_label': selectedOptions.size
            });
            
            console.log('Size selected:', selectedOptions.size);
        });
    });
    
    // ========================================
    // 数量選択
    // ========================================
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    minusBtn.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            selectedOptions.quantity = parseInt(quantityInput.value);
            
            window.dataLayer.push({
                'event': 'change_quantity',
                'event_category': 'product_interaction',
                'event_action': 'decrease_quantity',
                'event_label': selectedOptions.quantity
            });
        }
    });
    
    plusBtn.addEventListener('click', function() {
        if (quantityInput.value < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            selectedOptions.quantity = parseInt(quantityInput.value);
            
            window.dataLayer.push({
                'event': 'change_quantity',
                'event_category': 'product_interaction',
                'event_action': 'increase_quantity',
                'event_label': selectedOptions.quantity
            });
        }
    });
    
    quantityInput.addEventListener('change', function() {
        selectedOptions.quantity = parseInt(this.value);
    });
    
    // ========================================
    // カートに追加（重要なコンバージョンポイント）
    // ========================================
    const addToCartBtn = document.getElementById('add-to-cart');
    let cartItems = 0;
    
    addToCartBtn.addEventListener('click', function() {
        // カートカウントの更新
        cartItems += selectedOptions.quantity;
        document.querySelector('.cart-count').textContent = cartItems;
        
        // GA4 add_to_cart イベント
        window.dataLayer.push({
            'event': 'add_to_cart',
            'ecommerce': {
                'items': [{
                    ...productData,
                    quantity: selectedOptions.quantity,
                    item_variant: `${selectedOptions.color}_${selectedOptions.size}`
                }]
            }
        });
        
        // 成功メッセージ（実際のECサイトではモーダルなどを使用）
        const originalText = this.textContent;
        this.textContent = '✓ カートに追加しました';
        this.style.backgroundColor = '#10B981';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
        
        console.log('Added to cart:', selectedOptions);
    });
    
    // ========================================
    // 今すぐ購入（purchaseイベント - デモ用）
    // ========================================
    const buyNowBtn = document.querySelector('.buy-now');
    buyNowBtn.addEventListener('click', function() {
        // GA4 purchase イベント（研修用のダミーコンバージョン）
        window.dataLayer.push({
            'event': 'purchase',
            'ecommerce': {
                'transaction_id': 'DEMO_' + Date.now(),
                'value': productData.price * selectedOptions.quantity,
                'currency': 'JPY',
                'items': [{
                    ...productData,
                    quantity: selectedOptions.quantity,
                    item_variant: `${selectedOptions.color}_${selectedOptions.size}`
                }]
            }
        });
        
        alert('ご購入ありがとうございます！（これはデモです）');
        console.log('Purchase completed:', selectedOptions);
    });
    
    // ========================================
    // その他のインタラクション
    // ========================================
    
    // お気に入り追加
    document.querySelector('[data-event-action="add_to_wishlist"]').addEventListener('click', function() {
        window.dataLayer.push({
            'event': 'add_to_wishlist',
            'ecommerce': {
                'items': [productData]
            }
        });
        
        this.textContent = '❤️ お気に入りに追加済み';
        this.style.backgroundColor = '#FEE2E2';
    });
    
    // 関連商品クリック
    document.querySelectorAll('[data-event-action^="view_related"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemNumber = this.dataset.eventAction.split('_')[2];
            
            window.dataLayer.push({
                'event': 'select_item',
                'event_category': 'related_products',
                'event_action': 'click_related_item',
                'event_label': 'item_' + itemNumber
            });
        });
    });
    
    // スタッフコーディネート
    document.querySelectorAll('[data-event-action^="view_coordinate"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const coordNumber = this.dataset.eventAction.split('_')[2];
            
            window.dataLayer.push({
                'event': 'view_styling',
                'event_category': 'content_engagement',
                'event_action': 'view_staff_coordinate',
                'event_label': 'style_' + coordNumber
            });
        });
    });
    
    // ========================================
    // スクロール深度トラッキング
    // ========================================
    let scrollDepthTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };
    
    function trackScrollDepth() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);
        
        [25, 50, 75, 100].forEach(threshold => {
            if (scrollPercentage >= threshold && !scrollDepthTracked[threshold]) {
                scrollDepthTracked[threshold] = true;
                
                window.dataLayer.push({
                    'event': 'scroll_depth',
                    'event_category': 'engagement',
                    'event_action': 'scroll',
                    'event_label': threshold + '%',
                    'scroll_percentage': threshold
                });
                
                console.log('Scroll depth reached:', threshold + '%');
            }
        });
    }
    
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(trackScrollDepth, 100);
    });
    
    // ========================================
    // A/Bテスト用の要素操作
    // ========================================
    
    // URLパラメータでバリアントをシミュレート
    const urlParams = new URLSearchParams(window.location.search);
    const variant = urlParams.get('variant');
    
    if (variant === 'B') {
        // Bパターン：オレンジ色のボタン
        addToCartBtn.style.backgroundColor = '#FF6B00';
        addToCartBtn.classList.add('variant-b');
        
        // Bパターン：ボタンの位置を商品タイトルの直下に移動
        const productInfo = document.querySelector('.product-info');
        const productTitle = document.querySelector('.product-title');
        const purchaseButtons = document.querySelector('.purchase-buttons');
        
        // ボタンを上部に移動（オプション）
        // productInfo.insertBefore(purchaseButtons, productTitle.nextSibling);
        
        // バリアント情報をdataLayerに送信
        window.dataLayer.push({
            'event': 'experiment_impression',
            'experiment_id': 'button_test_001',
            'variant_id': 'B'
        });
        
        console.log('A/B Test - Variant B active');
    } else {
        // Aパターン（デフォルト）
        window.dataLayer.push({
            'event': 'experiment_impression',
            'experiment_id': 'button_test_001',
            'variant_id': 'A'
        });
        
        console.log('A/B Test - Variant A active');
    }
    
    // ========================================
    // デバッグヘルパー
    // ========================================
    
    // コンソールでdataLayerの内容を確認
    window.debugDataLayer = function() {
        console.log('Current dataLayer:', window.dataLayer);
        console.log('Selected options:', selectedOptions);
        console.log('Cart items:', cartItems);
    };
    
    // GTMが正しくロードされているか確認
    if (window.google_tag_manager) {
        console.log('GTM loaded successfully');
    } else {
        console.warn('GTM not detected. Please add GTM container snippet.');
    }
    
    // ========================================
    // 閲覧履歴の記録（LocalStorageを使わず）
    // ========================================
    // 研修環境ではLocalStorageが使えないため、
    // セッション中のメモリにのみ保存
    window.browsingHistory = window.browsingHistory || [];
    window.browsingHistory.push({
        id: productData.item_id,
        name: productData.item_name,
        price: productData.price,
        timestamp: Date.now()
    });
    
    console.log('Product page initialized. Use debugDataLayer() for debugging.');
});
