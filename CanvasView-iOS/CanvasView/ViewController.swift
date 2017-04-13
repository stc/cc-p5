import UIKit
import WebKit

class ViewController: UIViewController , WKNavigationDelegate{
    
    var webView : WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        webView = WKWebView(frame: self.view.frame)
        webView.navigationDelegate = self
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.panGestureRecognizer.isEnabled = false
        webView.scrollView.bouncesZoom = false
        webView.scrollView.bounces = false
        webView.scrollView.isPagingEnabled = false;
        
        webView?.load(URLRequest(url: URL(fileURLWithPath: Bundle.main.path(forResource:"index", ofType:"html")!)))
        
        self.view.addSubview(webView)
        self.view.sendSubview(toBack: webView)
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //MARK:- WKNavigationDelegate
    
    func webView(webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: NSError) {
        print(error.localizedDescription)
    }
    func webView(webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        print("Start to load")
    }
    func webView(webView: WKWebView, didFinishNavigation navigation: WKNavigation!) {
        print("finish to load")
    }
    
}

